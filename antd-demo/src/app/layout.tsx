import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import App from './pages/_app';
import MyDocument from './pages/_document';

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <div>
      </div>
    </body>
  </html>
);

export default RootLayout;