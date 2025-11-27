/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `tokenType` on the `Account` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('SUCCESS', 'FAILED', 'PARTIAL');

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "accessToken",
DROP COLUMN "expiresAt",
DROP COLUMN "refreshToken",
DROP COLUMN "scope",
DROP COLUMN "tokenType";

-- CreateTable
CREATE TABLE "ProviderToken" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "tokenType" TEXT,
    "scope" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "ProviderToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "Provider" NOT NULL,
    "providerPlaylistId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyncMapping" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sourcePlaylistId" TEXT NOT NULL,
    "targetPlaylistId" TEXT NOT NULL,
    "lastRunAt" TIMESTAMP(3),
    "lastStatus" "SyncStatus",
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SyncMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyncRunLog" (
    "id" TEXT NOT NULL,
    "syncMappingId" TEXT NOT NULL,
    "status" "SyncStatus" NOT NULL,
    "totalTracks" INTEGER NOT NULL,
    "matchedTracks" INTEGER NOT NULL,
    "failedTracks" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "errorMessage" TEXT,

    CONSTRAINT "SyncRunLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProviderToken_accountId_idx" ON "ProviderToken"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_provider_providerPlaylistId_userId_key" ON "Playlist"("provider", "providerPlaylistId", "userId");

-- CreateIndex
CREATE INDEX "SyncRunLog_syncMappingId_idx" ON "SyncRunLog"("syncMappingId");

-- AddForeignKey
ALTER TABLE "ProviderToken" ADD CONSTRAINT "ProviderToken_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncMapping" ADD CONSTRAINT "SyncMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncMapping" ADD CONSTRAINT "SyncMapping_sourcePlaylistId_fkey" FOREIGN KEY ("sourcePlaylistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncMapping" ADD CONSTRAINT "SyncMapping_targetPlaylistId_fkey" FOREIGN KEY ("targetPlaylistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncRunLog" ADD CONSTRAINT "SyncRunLog_syncMappingId_fkey" FOREIGN KEY ("syncMappingId") REFERENCES "SyncMapping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
