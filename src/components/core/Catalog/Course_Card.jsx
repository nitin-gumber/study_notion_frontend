import React, { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
import { encryptId } from "../../../util/encryptUrl";
import GetAvgRating from "../../../util/avgRating";

function Course_Card({ course }) {
  const encryptedId = useMemo(() => encryptId(course._id), [course._id]);

  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReview);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <>
      <Link to={`/courses/${encryptedId}`} style={{ textDecoration: "none" }}>
        <Card
          sx={{
            maxWidth: 345,
            borderRadius: "16px",
            boxShadow: 3,
            background: "#000814",
            border: "0.5px solid",
            borderColor: "#6E5503",
            padding: "10px",
          }}
        >
          {/* Responsive Thumbnail */}
          <Box
            sx={{
              position: "relative",
              paddingTop: "56.25%", // 16:9 aspect ratio
              overflow: "hidden",
              borderRadius: "16px 16px 0 0",
            }}
          >
            <CardMedia
              component="img"
              image={course?.thumbnail}
              alt={course?.courseName}
              loading="lazy"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* Course Details */}
          <CardContent>
            {/* Course Title */}
            <Typography
              variant="h6"
              color="#F1F2FF"
              gutterBottom
              sx={{ fontWeight: "bold", fontSize: "1rem" }}
            >
              {course?.courseName.split(" ").length > 4
                ? course?.courseName.split(" ").slice(0, 4).join(" ") + "..."
                : course?.courseName}
            </Typography>

            {/* Discription */}
            <Typography variant="body2" color="#F1F2FF">
              {course?.courseDescription.length > 80
                ? course?.courseDescription.slice(0, 80) + "..."
                : course?.courseDescription}
            </Typography>

            {/* Rating and Reviews */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}>
              <Typography variant="body2" color="#F1F2FF">
                {avgReviewCount || 0}
              </Typography>

              {/* MUI Rating Component */}
              <Rating
                name="read-only"
                value={avgReviewCount || 0}
                precision={0.5}
                readOnly
                size="small"
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#ffd700", // Yellow for filled stars
                  },
                  "& .MuiRating-iconEmpty": {
                    color: "#d3d3d3", // Optional: Light gray color for empty stars
                  },
                }}
              />

              <Typography variant="body2" color="#F1F2FF">
                ({course?.ratingAndReviews?.length} Ratings)
              </Typography>
            </Box>

            {/* Price */}
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#CFAB08",
                  color: "#000814",
                  textTransform: "none",
                  width: "100%",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  "&:hover": { backgroundColor: "#CFAB08" },
                }}
              >
                Rs. {course?.price}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </>
  );
}

export default Course_Card;
