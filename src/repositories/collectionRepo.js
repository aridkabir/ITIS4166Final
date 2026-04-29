import prisma from '../config/db.js';

export function findAllCollections(user) {
  if (user.role === 'admin') {
    return prisma.collection.findMany({
      orderBy: { id: 'asc' },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
        games: {
          include: {
            game: true,
          },
        },
      },
    });
  }

  return prisma.collection.findMany({
    where: {
      userId: user.id,
    },
    orderBy: { id: 'asc' },
    include: {
      games: {
        include: {
          game: true,
        },
      },
    },
  });
}

export function findCollectionById(id) {
  return prisma.collection.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
      games: {
        include: {
          game: true,
        },
      },
    },
  });
}

export function createCollection(data) {
  return prisma.collection.create({
    data,
    include: {
      games: {
        include: {
          game: true,
        },
      },
    },
  });
}

export function updateCollection(id, data) {
  return prisma.collection.update({
    where: { id },
    data,
    include: {
      games: {
        include: {
          game: true,
        },
      },
    },
  });
}

export function deleteCollection(id) {
  return prisma.collection.delete({
    where: { id },
  });
}