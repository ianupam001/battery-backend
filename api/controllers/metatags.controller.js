import {
  ServiceMetaTags,
  ProductMetaTags,
  BlogMetaTags,
  OtherMetaTags,
  CommonMetaTags,
} from "../models/metatags.model.js";

const getModelByType = (type) => {
  switch (type) {
    case "service":
      return ServiceMetaTags;
    case "product":
      return ProductMetaTags;
    case "blog":
      return BlogMetaTags;
    case "other":
      return OtherMetaTags;
    case "common":
      return CommonMetaTags;
    default:
      throw new Error("Invalid type");
  }
};

export const createMetaTag = async (req, res) => {
  try {
    const Model = getModelByType(req.params.type);
    const metaTag = new Model(req.body);
    const savedMetaTag = await metaTag.save();
    res.status(201).json(savedMetaTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllMetaTags = async (req, res) => {
  try {
    const Model = getModelByType(req.params.type);
    const metaTags = await Model.find();
    res.status(200).json(metaTags);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMetaTagById = async (req, res) => {
  try {
    const Model = getModelByType(req.params.type);
    const metaTag = await Model.findById(req.params.id);
    if (!metaTag) return res.status(404).json({ message: "MetaTag not found" });
    res.status(200).json(metaTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMetaTag = async (req, res) => {
  try {
    const Model = getModelByType(req.params.type);
    const updatedMetaTag = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMetaTag)
      return res.status(404).json({ message: "MetaTag not found" });
    res.status(200).json(updatedMetaTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMetaTag = async (req, res) => {
  try {
    const Model = getModelByType(req.params.type);
    const deletedMetaTag = await Model.findByIdAndDelete(req.params.id);
    if (!deletedMetaTag)
      return res.status(404).json({ message: "MetaTag not found" });
    res.status(200).json({ message: "MetaTag deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
