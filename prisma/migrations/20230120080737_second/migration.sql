-- CreateTable
CREATE TABLE "BasicInfo" (
    "id" TEXT NOT NULL,
    "first" VARCHAR(40) NOT NULL,
    "last" VARCHAR(40) NOT NULL,
    "age" SMALLINT NOT NULL,
    "phone" VARCHAR(12) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "skill" VARCHAR(20)[],
    "language" VARCHAR(20)[],
    "about" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "BasicInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BasicInfo_user_id_key" ON "BasicInfo"("user_id");

-- AddForeignKey
ALTER TABLE "BasicInfo" ADD CONSTRAINT "BasicInfo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
