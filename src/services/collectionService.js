import * as collectionRepo from '../repositories/collectionRepo.js';

function createError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function checkOwnership(collection, user) {
  if (user.role !== 'admin' && collection.userId !== user.id) {
    throw createError(403, 'User does not have permission');
  }
}

export async function getAllCollections(user) {
  return collectionRepo.findAllCollections(user);
}

export async function getCollectionById(id, user) {
  if (!Number.isInteger(id) || id <= 0) {
    throw createError(400, 'Invalid collection ID');
  }

  const collection = await collectionRepo.findCollectionById(id);

  if (!collection) {
    throw createError(404, 'Collection not found');
  }

  checkOwnership(collection, user);

  return collection;
}

export async function createCollection(data, user) {
  if (!data.name) {
    throw createError(400, 'Name is required');
  }

  return collectionRepo.createCollection({
    name: data.name,
    userId: user.id,
    games: Array.isArray(data.gameIds)
      ? {
          create: data.gameIds.map((gameId) => ({
            game: {
              connect: { id: gameId },
            },
          })),
        }
      : undefined,
  });
}

export async function updateCollection(id, data, user) {
  if (!Number.isInteger(id) || id <= 0) {
    throw createError(400, 'Invalid collection ID');
  }

  const collection = await collectionRepo.findCollectionById(id);

  if (!collection) {
    throw createError(404, 'Collection not found');
  }

  checkOwnership(collection, user);

  if (!data.name) {
    throw createError(400, 'Name is required');
  }

  return collectionRepo.updateCollection(id, {
    name: data.name,
    games: Array.isArray(data.gameIds)
      ? {
          deleteMany: {},
          create: data.gameIds.map((gameId) => ({
            game: {
              connect: { id: gameId },
            },
          })),
        }
      : undefined,
  });
}

export async function deleteCollection(id, user) {
  if (!Number.isInteger(id) || id <= 0) {
    throw createError(400, 'Invalid collection ID');
  }

  const collection = await collectionRepo.findCollectionById(id);

  if (!collection) {
    throw createError(404, 'Collection not found');
  }

  checkOwnership(collection, user);

  await collectionRepo.deleteCollection(id);
}