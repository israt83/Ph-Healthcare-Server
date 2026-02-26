/*
  Warnings:

  - You are about to drop the column `appoinmentFee` on the `doctor` table. All the data in the column will be lost.
  - You are about to drop the column `experince` on the `doctor` table. All the data in the column will be lost.
  - Added the required column `appointmentFee` to the `doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctor" DROP COLUMN "appoinmentFee",
DROP COLUMN "experince",
ADD COLUMN     "appointmentFee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "isDeleted" SET DEFAULT false;
