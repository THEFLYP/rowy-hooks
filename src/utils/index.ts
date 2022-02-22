import { getSecret } from "./secrets.js";
import { getServiceAccountUser } from "./getServiceAccountUser.js";
import { url2storage, data2storage } from "./storage";
import {
  getNumericProjectId,
  getProjectId,
  getServiceAccountEmail,
} from "../metadataService.js";
type RowyFile = {
  downloadURL: string;
  name: string;
  type: string;
  lastModifiedTS: number;
};
type RowyUser = {
  email: any;
  emailVerified: boolean;
  displayName: string;
  photoURL: string;
  uid: string;
  timestamp: number;
};
type uploadOptions = {
  bucket?: string;
  folderPath?: string;
  fileName?: string;
};
interface Rowy {
  metadata: {
    projectId: () => Promise<string>;
    projectNumber: () => Promise<string>;
    serviceAccountEmail: () => Promise<string>;
    serviceAccountUser: () => Promise<RowyUser>;
  };
  secrets: {
    get: (name: string, version?: string) => Promise<string | undefined>;
  };
  storage: {
    upload: {
      url: (
        url: string,
        options: uploadOptions
      ) => Promise<RowyFile | undefined>;
      data: (
        data: Buffer | string,
        options: uploadOptions
      ) => Promise<RowyFile | undefined>;
    };
  };
}

const rowy: any = {
  getSecret,
  getServiceAccountUser,
  url2storage,
  metadata: {
    projectId: getProjectId,
    projectNumber: getNumericProjectId,
    serviceAccountUser: getServiceAccountUser,
    serviceAccountEmail: getServiceAccountEmail,
  },
  secrets: {
    get: getSecret,
  },
  storage: {
    upload: {
      url: url2storage,
      data: data2storage,
    },
  },
};
export default rowy;
