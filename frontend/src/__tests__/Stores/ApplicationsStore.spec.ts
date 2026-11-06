import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Application, Group } from '../../api/apiDataTypes';
import ApplicationsStore from '../../stores/ApplicationsStore';

describe('ApplicationsStore delete error handling', () => {
  const mockFetch = vi.spyOn(global, 'fetch');

  function rejectedResponse() {
    return {
      ok: false,
      status: 403,
      headers: { get: vi.fn().mockReturnValue(null) },
    } as unknown as Response;
  }

  function application(): Application {
    return {
      id: 'app1',
      name: 'app1',
      groups: [{ id: 'group1', name: 'group1' } as Group],
    } as Application;
  }

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('keeps the application cached when the server rejects the delete', async () => {
    const store = new ApplicationsStore();
    store.applications = [application()];
    mockFetch.mockResolvedValueOnce(rejectedResponse());

    await expect(store.deleteApplication('app1')).rejects.toBeTruthy();

    expect(store.applications).toHaveLength(1);
  });

  it('keeps the group cached when the server rejects the delete', async () => {
    const store = new ApplicationsStore();
    store.applications = [application()];
    mockFetch.mockResolvedValueOnce(rejectedResponse());

    await expect(store.deleteGroup('app1', 'group1')).rejects.toBeTruthy();

    expect(store.applications[0].groups).toHaveLength(1);
  });
});
