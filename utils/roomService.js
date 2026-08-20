import { roomMockApi } from './roomMock.js';

// Pages depend on this adapter only. Replace this export with a real backend
// implementation later without changing room pages.
export const roomService = roomMockApi;
