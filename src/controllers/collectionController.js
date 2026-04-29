import * as collectionService from '../services/collectionService.js';

export async function getAllCollections(req, res, next) {
  try {
    const collections = await collectionService.getAllCollections(req.user);
    res.json(collections);
  } catch (error) {
    next(error);
  }
}

export async function getCollectionById(req, res, next) {
  try {
    const collection = await collectionService.getCollectionById(
      Number(req.params.id),
      req.user
    );

    res.json(collection);
  } catch (error) {
    next(error);
  }
}

export async function createCollection(req, res, next) {
  try {
    const collection = await collectionService.createCollection(req.body, req.user);
    res.status(201).json(collection);
  } catch (error) {
    next(error);
  }
}

export async function updateCollection(req, res, next) {
  try {
    const collection = await collectionService.updateCollection(
      Number(req.params.id),
      req.body,
      req.user
    );

    res.json(collection);
  } catch (error) {
    next(error);
  }
}

export async function deleteCollection(req, res, next) {
  try {
    await collectionService.deleteCollection(Number(req.params.id), req.user);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}