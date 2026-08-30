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
  Tooltip,
  Typography,
} from "@mui/material";

const ProjectLayout = ({ name, description, date, demoLink, featured = false }) => {
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
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="w-full"
    >
      <Card
        elevation={0}
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "100%",
          borderRadius: { xs: 3, md: 4 },
          background: featured
            ? "linear-gradient(135deg, rgba(254,254,91,.13), rgba(16,18,22,.92) 48%, rgba(10,11,14,.96))"
            : "linear-gradient(145deg, rgba(255,255,255,.075), rgba(10,11,14,.78))",
          border: featured
            ? "1px solid rgba(254,254,91,.42)"
            : "1px solid rgba(255,255,255,.12)",
          boxShadow: featured
            ? "0 22px 70px rgba(0,0,0,.30)"
            : "0 18px 50px rgba(0,0,0,.22)",
          backdropFilter: "blur(18px)",
          transition: "border-color .25s ease, box-shadow .25s ease, transform .25s ease",
          "&:hover": {
            borderColor: featured ? "rgba(254,254,91,.75)" : "rgba(254,254,91,.42)",
            boxShadow: "0 28px 80px rgba(0,0,0,.36)",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 90% 0%, rgba(254,254,91,.14), transparent 34%)",
            pointerEvents: "none",
          },
        }}
      >
        <CardActionArea
          component={Link}
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ height: "100%", display: "block" }}
        >
          <CardContent sx={{ position: "relative", p: { xs: 2.5, md: 3.25 } }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  size="small"
                  icon={featured ? <Sparkles size={14} /> : undefined}
                  label={featured ? "Featured project" : projectType}
                  sx={{
                    color: featured ? "#FEFE5B" : "rgba(255,255,255,.72)",
                    backgroundColor: featured ? "rgba(254,254,91,.10)" : "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.10)",
                    fontWeight: 600,
                    letterSpacing: ".02em",
                    "& .MuiChip-icon": { color: "inherit" },
                  }}
                />
              </Stack>

              <Tooltip title="Open project on GitHub">
                <Box
                  component="span"
                  sx={{
                    width: 38,
                    height: 38,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "50%",
                    color: "rgba(255,255,255,.72)",
                    border: "1px solid rgba(255,255,255,.12)",
                    transition: "all .25s ease",
                    "&:hover": {
                      color: "#FEFE5B",
                      borderColor: "rgba(254,254,91,.5)",
                      transform: "rotate(8deg) scale(1.06)",
                    },
                  }}
                >
                  <ArrowUpRight size={19} />
                </Box>
              </Tooltip>
            </Stack>

            <Typography
              component="h2"
              sx={{
                mt: 2.5,
                color: "#fff",
                fontSize: { xs: "1.35rem", md: featured ? "1.85rem" : "1.45rem" },
                lineHeight: 1.18,
                fontWeight: 700,
                letterSpacing: "-.025em",
              }}
            >
              {name}
            </Typography>

            <Typography
              sx={{
                mt: 1.2,
                color: "rgba(255,255,255,.64)",
                fontSize: { xs: ".88rem", md: ".95rem" },
                lineHeight: 1.7,
                maxWidth: "58rem",
              }}
            >
              {description}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretch", sm: "center" }}
              justifyContent="space-between"
              spacing={2}
              sx={{ mt: 3 }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Stack direction="row" spacing={0.8} alignItems="center">
                  <CalendarDays size={15} color="rgba(255,255,255,.48)" />
                  <Typography sx={{ color: "rgba(255,255,255,.48)", fontSize: ".78rem" }}>
                    {formattedDate}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={0.8} alignItems="center">
                  <Github size={15} color="rgba(255,255,255,.48)" />
                  <Typography sx={{ color: "rgba(255,255,255,.48)", fontSize: ".78rem" }}>
                    Source available
                  </Typography>
                </Stack>
              </Stack>

              <Button
                component="span"
                variant="outlined"
                size="small"
                endIcon={<ExternalLink size={15} />}
                sx={{
                  alignSelf: { xs: "flex-start", sm: "auto" },
                  minWidth: 142,
                  borderRadius: 999,
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
    </motion.div>
  );
};

export default ProjectLayout;
