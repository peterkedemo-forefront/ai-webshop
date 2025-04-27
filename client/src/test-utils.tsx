import React from 'react';
import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { render, RenderOptions } from '@testing-library/react';

const AllProviders = ({ children }: { children: ReactNode }) => (
  <MantineProvider defaultColorScheme="light">{children}</MantineProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
