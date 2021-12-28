import * as FileSystem from "expo-file-system";
import * as Crypto from "expo-crypto";

export class CustomImageCache {
  private imageDir() {
    const dir = FileSystem.cacheDirectory + "stayr/";
    return dir;
  }

  private async ensureDirectoryExists(): Promise<void> {
    const imageDir = this.imageDir();
    const dirInfo = await FileSystem.getInfoAsync(imageDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imageDir, { intermediates: true });
    }
  }

  private async getUriHash(uri: string): Promise<string> {
    const hashedUri = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      uri
    );
    return hashedUri;
  }

  private async getFileUri(uri: string): Promise<string> {
    const hash = await this.getUriHash(uri);
    const dir = this.imageDir();
    return dir + `${hash}`;
  }

  async getImageUri(uri: string): Promise<string> {
    try {
      await this.ensureDirectoryExists();
      const fileUri = await this.getFileUri(uri);

      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (!fileInfo.exists) {
        await FileSystem.downloadAsync(uri, fileUri);
      }

      return fileUri;
    } catch (error) {
      throw error;
    }
  }
}
