import { Request, Response } from "express";
import { Contact } from "../models";
import { asyncHandler, ApiResponse, ApiError } from "../utils";

export const createContact = asyncHandler(
  async (req: Request, res: Response) => {
    const contact = await Contact.create(req.body);
    res
      .status(201)
      .json(new ApiResponse(201, "Message sent successfully", contact));
  }
);

export const getContacts = asyncHandler(async (req: Request, res: Response) => {
  const { isRead } = req.query;
  const filter: any = {};
  if (isRead !== undefined) filter.isRead = isRead === "true";

  const contacts = await Contact.find(filter).sort({ createdAt: -1 });
  res.json(new ApiResponse(200, "Contacts retrieved", contacts));
});

export const getContact = asyncHandler(async (req: Request, res: Response) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) throw new ApiError(404, "Contact not found");
  res.json(new ApiResponse(200, "Contact retrieved", contact));
});

export const markAsRead = asyncHandler(async (req: Request, res: Response) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );
  if (!contact) throw new ApiError(404, "Contact not found");
  res.json(new ApiResponse(200, "Contact marked as read", contact));
});

export const deleteContact = asyncHandler(
  async (req: Request, res: Response) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) throw new ApiError(404, "Contact not found");
    res.json(new ApiResponse(200, "Contact deleted", { id: contact._id }));
  }
);
