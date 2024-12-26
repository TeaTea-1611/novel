import fs from "fs/promises";
import path from "path";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

@Service()
@Resolver()
export class AppResolver {
  private static readonly fileMap = {
    termsOfService: "../../../public/terms-of-service.md",
    privacyPolicy: "../../../public/privacy-policy.md",
    copyright: "../../../public/copyright.md",
  };

  private async readFile(fileName: keyof typeof AppResolver.fileMap) {
    const filePath = path.join(import.meta.dir, AppResolver.fileMap[fileName]);

    try {
      return await fs.readFile(filePath, "utf-8");
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return null;
      }
      throw new Error("An error occurred while reading the file.");
    }
  }

  private async writeFile(
    fileName: keyof typeof AppResolver.fileMap,
    value: string,
  ) {
    const filePath = path.join(import.meta.dir, AppResolver.fileMap[fileName]);

    if (!value || value.trim() === "") {
      throw new Error("The content cannot be empty.");
    }

    try {
      await fs.writeFile(filePath, value, "utf-8");
    } catch (error: any) {
      // If the directory does not exist, create it and then write the file
      if (error.code === "ENOENT") {
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, value, "utf-8");
      } else {
        throw new Error("An error occurred while writing the file.");
      }
    }

    return true;
  }

  @Query(() => String, { nullable: true })
  async termsOfService() {
    return this.readFile("termsOfService");
  }

  @Mutation(() => Boolean, { nullable: true })
  async updateTermsOfService(@Arg("value") value: string) {
    return await this.writeFile("termsOfService", value);
  }

  @Query(() => String, { nullable: true })
  async privacyPolicy() {
    return this.readFile("privacyPolicy");
  }

  @Mutation(() => Boolean, { nullable: true })
  async updatePrivacyPolicy(@Arg("value") value: string) {
    return await this.writeFile("privacyPolicy", value);
  }

  @Query(() => String, { nullable: true })
  async copyright() {
    return this.readFile("copyright");
  }

  @Mutation(() => Boolean, { nullable: true })
  async updateCopyright(@Arg("value") value: string) {
    return await this.writeFile("copyright", value);
  }
}
