-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "level" VARCHAR(40) NOT NULL,
    "field" VARCHAR(50) NOT NULL,
    "branch" VARCHAR(50) NOT NULL,
    "institute" VARCHAR(60) NOT NULL,
    "entrance" TIMESTAMP(3) NOT NULL,
    "graduate" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
