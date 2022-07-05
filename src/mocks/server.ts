import { setupServer } from "msw/node";
import { apiHandler } from "./apiHandler";

// mocking server 생성
export const server = setupServer(...apiHandler)
