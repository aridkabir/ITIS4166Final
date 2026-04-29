import prisma from '../config/db.js';

export function findAllGames(sortBy = 'id', order = 'asc') {
  return prisma.game.findMany({
    orderBy: {
      [sortBy]: order,
    },
    include: {
      platforms: {
        include: {
          platform: true,
        },
      },
    },
  });
}

export function findGameById(id) {
  return prisma.game.findUnique({
    where: { id },
    include: {
      platforms: {
        include: {
          platform: true,
        },
      },
    },
  });
}

export function createGame(data) {
  return prisma.game.create({
    data,
    include: {
      platforms: {
        include: {
          platform: true,
        },
      },
    },
  });
}

export function updateGame(id, data) {
  return prisma.game.update({
    where: { id },
    data,
    include: {
      platforms: {
        include: {
          platform: true,
        },
      },
    },
  });
}

export function deleteGame(id) {
  return prisma.game.delete({
    where: { id },
  });
}