import { describe, expect, test, vi } from 'vitest';

const { createAppSpy, mountSpy, useSpy } = vi.hoisted(() => {
  const useSpy = vi.fn();
  const mountSpy = vi.fn();

  return {
    createAppSpy: vi.fn().mockReturnValue({
      use: useSpy,
      mount: mountSpy,
    }),
    mountSpy,
    useSpy,
  };
});

vi.mock('vue', async (importOriginal) => {
  const mod = await importOriginal<typeof import('vue')>();

  return {
    ...mod,
    createApp: createAppSpy,
  };
});

vi.mock('@/router', () => ({
  default: 'router',
}));

vi.mock('pinia', async (importOriginal) => {
  const mod = await importOriginal<typeof import('pinia')>();

  return {
    ...mod,
    createPinia: vi.fn().mockReturnValue('pinia'),
  };
});

describe('main.ts', () => {
  test('should be configured with pinia and router', async () => {
    await import('@/main');

    expect(createAppSpy).toHaveBeenCalled();
    expect(mountSpy).toHaveBeenCalledWith('#app');

    // console.log(useSpy.mock.calls);
    expect(useSpy).toHaveBeenCalledWith('router');
    expect(useSpy).toHaveBeenCalledWith('pinia');
  });
});
