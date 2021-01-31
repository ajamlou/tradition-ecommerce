import { firestore } from "./../../firebase/utils";

export const handleAddProduct = (product) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc()
      .set(product)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchProducts = ({
  filterType,
  startAfterDoc,
  persistProducts = [],
}) => {
  return new Promise((resolve, reject) => {
    const pageSize = 9;

    let ref = firestore
      .collection("products")
      .orderBy("createdDate", "desc")
      .limit(pageSize);

    if (filterType) ref = ref.where("productCategory", "==", filterType);
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

    ref
      .get()
      .then((snapshot) => {
        const totalCount = snapshot.size;

        const data = [
          ...persistProducts,
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

export const handleDeleteProduct = (documentID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(documentID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleEditProduct = (product) => {
  const productName = product.productName;
  const productCategory = product.productCategory;
  const productThumbnail = product.productThumbnail;
  const productPrice = product.productPrice;
  const productDesc = product.productDesc;

  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(product.productID)
      .update({
        productName: productName,
        productCategory: productCategory,
        productThumbnail: productThumbnail,
        productPrice: productPrice,
        productDesc: productDesc,
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleMarkAsSold = (payload) => {
  const documentID = payload[0];
  const productSold = payload[1];
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(documentID)
      .update({
        productSold: !productSold,
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchProduct = (productID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(productID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve({
            ...snapshot.data(),
            documentID: productID,
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
