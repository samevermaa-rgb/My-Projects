const Project = require(
  "../models/project.model"
);

const getProjectCount = async (
  req,
  res
) => {
  try {
    const count =
      await Project.countDocuments();

    res.status(200).json({
  success: true,
  totalProjects: count,
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to get project count",
    });
  }
};

const createProject = async (
  req,
  res
) => {
  try {
    console.log(
      "BODY:",
      req.body
    );

    console.log(
      "FILES:",
      req.files
    );

    const {
      title,
      category,
      description,
      technologies,
      githubLink,
      liveLink,
      status,
    } = req.body;

    const screenshots =
      req.files
        ? req.files.map(
            (file) => file.path
          )
        : [];

    const parsedTechnologies =
      technologies
        ? JSON.parse(
            technologies
          )
        : [];

    const project =
      await Project.create({
        title,
        category,
        description,
        technologies:
          parsedTechnologies,
        githubLink,
        liveLink,
        screenshots,
        status,
      });

    return res
      .status(201)
      .json({
        success: true,
        data: project,
      });
  } catch (error) {
    console.log(
      "PROJECT ERROR:"
    );

    console.log(error);

    return res
      .status(500)
      .json({
        success: false,
        message:
          error.message ||
          "Server Error",
        error: String(error),
      });
  }
};

const getProjects = async (
  req,
  res
) => {
  try {
    const projects =
      await Project.find();

    return res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message:
          error.message,
      });
  }
};

module.exports = {
  getProjectCount,
  createProject,
  getProjects,
};