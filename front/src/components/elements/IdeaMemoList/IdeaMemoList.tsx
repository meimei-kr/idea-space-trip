"use client";

import { IdeaMemoType } from "@/types";
import IdeaMemoCard from "../IdeaMemoCard/IdeaMemoCard";
import Modal from "../Modal/Modal";
import styles from "./IdeaMemoList.module.scss";
import ModalIdeaMemo from "../ModalIdeaMemo/ModalIdeaMemo";

export const IdeaMemoList = async ({
  open,
  uuid,
  ideaMemos,
}: {
  open: boolean;
  uuid: string;
  ideaMemos: IdeaMemoType[];
}) => {
  return (
    <>
      {ideaMemos.length === 0 ? (
        <div className={styles.noDataContainer}>
          <div className={styles.message}>
            <div>まだアイデアメモがないよ。</div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.content}>
            {ideaMemos.map((memo) => (
              <>
                <IdeaMemoCard key={memo.uuid} ideaMemo={memo} />
                <Modal open={memo.uuid === uuid && open}>
                  <ModalIdeaMemo ideaMemo={memo} />
                </Modal>
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
