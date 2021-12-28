import data from "@src/data/blogData.json";
import Logger from "@src/lib/Logger";

const BLOGS = data.blogs;

interface Blog {
  title: string;
  imageUrl: string;
  content: string;
  author: string;
  datePublished: string;
  views: number;
}

const DELAY_TIME = 4;
class MockRequest {
  private data: Array<Blog>;
  public errorInterceptor;

  constructor() {
    this.data = BLOGS;
    this.errorInterceptor = (error: unknown) => {
      Logger.log(error);
    };
  }

  getBlog(id: string): Blog {
    try {
      const data = this.data.filter((item) => item.title === id);
      if (!data.length) {
        throw new Error("NOT_FOUND");
      }

      return data[0];
    } catch (error) {
      if (this.errorInterceptor) {
        this.errorInterceptor(error);
      }

      throw error;
    }
  }

  getAll(): Promise<Blog[]> {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve(this.data);
        }, DELAY_TIME);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default MockRequest;
