"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  ExternalLink,
  Github,
  Sparkles,
} from "lucide-react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

const ProjectLayout = ({
  name,
  description,
  date,
  demoLink,
  featured = false,
}) => {
  const projectType = name.toLowerCase().includes("pakbooking")
    ? "Travel platform"
    : name.toLowerCase().includes("ecommerce")
      ? "E-commerce"
      : name.toLowerCase().includes("meeting")
        ? "Collaboration"
        : name.toLowerCase().includes("energy")
          ? "IoT / Analytics"
          : name.toLowerCase().includes("fitness")
            ? "Health & Fitness"
            : "Web application";

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className="h-full w-full"
    >
      <Card
        elevation={0}
        sx={{
          position: "relative",
          height: "100%",
          overflow: "hidden",
          borderRadius: { xs: 3, md: 4 },
          background: featured
            ? "linear-gradient(135deg, rgba(254,254,91,.12), rgba(18,20,24,.94) 52%, rgba(8,9,11,.98))"
            : "linear-gradient(145deg, rgba(255,255,255,.065), rgba(10,11,14,.86))",
          border: featured
            ? "1px solid rgba(254,254,91,.45)"
            : "1px solid rgba(255,255,255,.12)",
          boxShadow: featured
            ? "0 24px 80px rgba(0,0,0,.32)"
            : "0 16px 48px rgba(0,0,0,.22)",
          backdropFilter: "blur(18px)",
          transition: "border-color .25s ease, box-shadow .25s ease",
          "&:hover": {
            borderColor: featured
              ? "rgba(254,254,91,.72)"
              : "rgba(254,254,91,.42)",
            boxShadow: "0 26px 72px rgba(0,0,0,.34)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            width: 180,
            height: 180,
            right: -90,
            top: -90,
            borderRadius: "50%",
            background: "rgba(254,254,91,.08)",
            filter: "blur(8px)",
            pointerEvents: "none",
          },
        }}
      >
        <CardActionArea
          component={Link}
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ height: "100%" }}
        >
          <CardContent
            sx={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              minHeight: featured ? { xs: 300, md: 340 } : 270,
              flexDirection: "column",
              p: { xs: 2.5, sm: 3, md: featured ? 4 : 3.25 },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Chip
                size="small"
                icon={featured ? <Sparkles size={14} /> : undefined}
                label={featured ? "Featured project" : projectType}
                sx={{
                  color: featured ? "#FEFE5B" : "rgba(255,255,255,.72)",
                  backgroundColor: featured
                    ? "rgba(254,254,91,.10)"
                    : "rgba(255,255,255,.055)",
                  border: "1px solid rgba(255,255,255,.10)",
                  fontWeight: 600,
                  letterSpacing: ".02em",
                  "& .MuiChip-icon": { color: "inherit" },
                }}
              />

              <Box
                component="span"
                sx={{
                  display: "grid",
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  placeItems: "center",
                  borderRadius: "12px",
                  color: "rgba(255,255,255,.72)",
                  border: "1px solid rgba(255,255,255,.12)",
                  transition: "all .25s ease",
                  "&:hover": {
                    color: "#FEFE5B",
                    borderColor: "rgba(254,254,91,.5)",
                  },
                }}
              >
                <ArrowUpRight size={19} />
              </Box>
            </Stack>

            <Typography
              component="h2"
              sx={{
                mt: 3,
                color: "#fff",
                fontSize: {
                  xs: "1.35rem",
                  sm: featured ? "1.9rem" : "1.5rem",
                },
                lineHeight: 1.2,
                fontWeight: 700,
                letterSpacing: "-.025em",
              }}
            >
              {name}
            </Typography>

            <Typography
              sx={{
                mt: 1.4,
                maxWidth: featured ? "52rem" : "42rem",
                color: "rgba(255,255,255,.64)",
                fontSize: { xs: ".88rem", md: ".94rem" },
                lineHeight: 1.75,
              }}
            >
              {description}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              spacing={2}
              sx={{ mt: 4 }}
            >
              <Stack direction="row" spacing={2.25} alignItems="center">
                <Stack direction="row" spacing={0.8} alignItems="center">
                  <CalendarDays size={15} color="rgba(255,255,255,.45)" />
                  <Typography sx={{ color: "rgba(255,255,255,.45)", fontSize: ".78rem" }}>
                    {formattedDate}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={0.8} alignItems="center">
                  <Github size={15} color="rgba(255,255,255,.45)" />
                  <Typography sx={{ color: "rgba(255,255,255,.45)", fontSize: ".78rem" }}>
                    GitHub source
                  </Typography>
                </Stack>
              </Stack>

              <Button
                component="span"
                variant="outlined"
                size="small"
                endIcon={<ExternalLink size={15} />}
                sx={{
                  minWidth: 138,
                  borderRadius: 2.5,
                  textTransform: "none",
                  color: "#fff",
                  borderColor: "rgba(255,255,255,.18)",
                  fontWeight: 600,
                  px: 1.8,
                  "&:hover": {
                    borderColor: "#FEFE5B",
                    color: "#FEFE5B",
                    backgroundColor: "rgba(254,254,91,.06)",
                  },
                }}
              >
                View project
              </Button>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.article>
  );
};

export default ProjectLayout;
