-- CreateTable
CREATE TABLE "TypingTest" (
    "id" SERIAL NOT NULL,
    "wpm" DOUBLE PRECISION NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "TypingTest_pkey" PRIMARY KEY ("id")
);
