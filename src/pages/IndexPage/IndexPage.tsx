import type { FC } from "react";
import { qrScanner, sendData } from "@tma.js/sdk-react";
import { useEffect } from "react";
import { Page } from "@/components/Page.tsx";
import { Button } from "@telegram-apps/telegram-ui";
import emoji from "./emoji.gif";
import "./indexPage.css";
import { FaQrcode } from "react-icons/fa6";

const fetchQr = async () => {
  if (!qrScanner.isSupported()) {
    console.error("Scanner not supported");
    return;
  }
  const scanned = qrScanner.capture({
    capture(scannedQr) {
      try {
        console.log("scanning");
        const data = JSON.parse(scannedQr);
        if (data.code && data.c) {
          if (sendData.isAvailable()) {
            sendData(scannedQr);
          }
          return true;
        }
        return false;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  });

  await scanned; // ждём, пока сканирование завершится
};
export const IndexPage: FC = () => {
  useEffect(() => {
    // Задержка 100мс перед запуском
    const timer = setTimeout(() => {
      fetchQr();
    }, 100);

    return () => clearTimeout(timer); // очистка таймера
  }, []);

  return (
    <Page back={false}>
      <div className="emoji">
        <img src={emoji} alt="emoji" />
      </div>
      <div className="index_footer">
        <Button
          onClick={fetchQr}
          stretched
          size="l"
          before={<FaQrcode fontSize={24} size={24} />}
        >
          Scan QR
        </Button>
      </div>
    </Page>
  );
};
