import reviewModel from "../models/reviews.models.js";

// incorporar filtro
const readAllReviews = async (req, res) => {
  try {
    const result = await reviewModel.findAllReviews();

    if (!result) {
      return res.status(404).json({ message: "No hay Review disponibles" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Para revisar reviews por id específico (a trocar por filtro en búsqueda general)
const readReviewsByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await reviewModel.findReviewsByUSer(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Review no encontrado o Id inválido" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//Para revisar reviews por id específico (a trocar por filtro en búsqueda general)
const readReviewsByProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await reviewModel.findReviewsByProduct(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Review no encontrado o Id inválido" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Para revisar reviews por id específico
const readReviewsById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await reviewModel.findReviewsById(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Review no encontrado o Id inválido" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//cambiar email para id 
const createNewReview = async (req, res) => {
  const { email } = req.user;
  const { about_product, id_product, review_body, rating } = req.body;
  try {
    const result = await reviewModel.createReview(
      email,
      about_product,
      id_product,
      review_body,
      rating,
    );

    if (!result) {
      return res
        .status(404)
        .json({ message: "Review no encontrado o Id inválido" });
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateRegisteredReview = async (req, res) => {
  //id del review (que ya fue creado)
  const { id } = req.params;
  const { about_product, id_product, review_body, rating } = req.body;
  try {
    const result = await reviewModel.updateReview(
      id,
      about_product,
      id_product,
      review_body,
      rating,
    );

    if (!result) {
      return res
        .status(404)
        .json({ message: "Review no encontrado o Id inválido" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteRegisteredReview = async (req, res) => {
  const { id } = req.params;
  try {
    await reviewModel.deleteReview(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Review no encontrado o Id inválido" });
    }

    return res.status(200).json({ message: "Reseña eliminada con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const reviewController = {
  readAllReviews,
  readReviewsById,
  readReviewsByProduct,
  readReviewsByUser,
  createNewReview,
  updateRegisteredReview,
  deleteRegisteredReview,
};

export default reviewController;
