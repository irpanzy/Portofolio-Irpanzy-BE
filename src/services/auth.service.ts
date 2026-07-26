import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Admin } from "../models";
import { env } from "../config";
import { ApiError } from "../utils";
import { LoginDTO, AuthResponse, JWTPayload } from "../types";

export class AuthService {
  async login(credentials: LoginDTO): Promise<AuthResponse> {
    const { email, password } = credentials;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const payload = {
      id: admin._id.toString(),
      email: admin.email,
    };

    const token = this.generateToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return {
      token,
      refreshToken,
      admin: {
        email: admin.email,
      },
    };
  }

  generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    } as jwt.SignOptions);
  }

  generateRefreshToken(payload: JWTPayload): string {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    } as jwt.SignOptions);
  }

  verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, env.JWT_SECRET) as JWTPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new ApiError(401, "Token expired");
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new ApiError(401, "Invalid token");
      }
      throw new ApiError(401, "Token verification failed");
    }
  }

  verifyRefreshToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, env.JWT_REFRESH_SECRET) as JWTPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new ApiError(401, "Refresh token expired");
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new ApiError(401, "Invalid refresh token");
      }
      throw new ApiError(401, "Refresh token verification failed");
    }
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async createAdmin(email: string, password: string) {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      throw new ApiError(409, "Admin already exists");
    }

    const admin = new Admin({
      email,
      password,
    });

    await admin.save();

    return {
      email: admin.email,
      createdAt: admin.createdAt,
    };
  }

  async getAdminById(id: string) {
    const admin = await Admin.findById(id).select("-password");

    if (!admin) {
      throw new ApiError(404, "Admin not found");
    }

    return admin;
  }

  async updatePassword(
    adminId: string,
    oldPassword: string,
    newPassword: string
  ) {
    const admin = await Admin.findById(adminId);

    if (!admin) {
      throw new ApiError(404, "Admin not found");
    }

    const isOldPasswordValid = await admin.comparePassword(oldPassword);

    if (!isOldPasswordValid) {
      throw new ApiError(401, "Current password is incorrect");
    }

    admin.password = newPassword;
    await admin.save();

    return {
      message: "Password updated successfully",
    };
  }

  async refreshToken(oldRefreshToken: string): Promise<AuthResponse> {
    const decoded = this.verifyRefreshToken(oldRefreshToken);

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      throw new ApiError(404, "Admin not found");
    }

    const payload = {
      id: admin._id.toString(),
      email: admin.email,
    };

    const token = this.generateToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return {
      token,
      refreshToken,
      admin: {
        email: admin.email,
      },
    };
  }

  async seedDefaultAdmin() {
    try {
      const existingAdmin = await Admin.findOne({ email: env.ADMIN_EMAIL });

      if (existingAdmin) {
        console.log("✅ Default admin already exists");
        return;
      }

      await this.createAdmin(env.ADMIN_EMAIL, env.ADMIN_PASSWORD);
      console.log("✅ Default admin created:", env.ADMIN_EMAIL);
    } catch (error) {
      console.error("❌ Failed to seed default admin:", error);
      throw error;
    }
  }

  extractTokenFromHeader(authHeader?: string): string {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "No token provided");
    }

    return authHeader.substring(7);
  }

  async validateAuth(authHeader?: string): Promise<JWTPayload> {
    const token = this.extractTokenFromHeader(authHeader);
    const decoded = this.verifyToken(token);

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      throw new ApiError(401, "Admin account no longer exists");
    }

    return decoded;
  }
}

export const authService = new AuthService();
