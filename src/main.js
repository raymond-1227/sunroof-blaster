import { appWindow } from '@tauri-apps/api/window';

appWindow.onCloseRequested(async (event) => {
  event.preventDefault();
  await appWindow.hide();
});