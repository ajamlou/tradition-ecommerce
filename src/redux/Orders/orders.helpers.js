import { firestore } from "./../../firebase/utils";

export const handleFetchOrders = () => {
  //{ startAfterDoc, persistOrders = [] }

  return new Promise((resolve, reject) => {
    const pageSize = 9;

    let ref = firestore
      .collection("orders")
      .orderBy("orderCreatedDate", "desc");
    //.limit(pageSize);

    //if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

    ref
      .get()
      .then((snapshot) => {
        const totalCount = snapshot.size;
        const data = [
          //...persistOrders,
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleSaveOrder = (order) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc()
      .set(order)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleGetUserOrderHistory = (uid) => {
  return new Promise((resolve, reject) => {
    let ref = firestore
      .collection("orders")
      .orderBy("orderCreatedDate", "desc");
    ref = ref.where("orderUserID", "==", uid);

    ref
      .get()
      .then((snap) => {
        const data = [
          ...snap.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        resolve({ data });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleGetOrder = (orderID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc(orderID)
      .get()
      .then((snap) => {
        if (snap.exists) {
          resolve({
            ...snap.data(),
            documentID: orderID,
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
