const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const users = require("../models/users");
const Joi = require("joi");
const tracksModel = require("../models/tracks");
const signUpUser = async (req, res) => {
  const { name, email, password, jobRole } = req.body; // Assuming jobRole is provided during signup

  const UserSchema = Joi.object().keys({
    name: Joi.string()
      .min(3)
      .max(100)
      .required()
      .pattern(new RegExp("[a-z A-Z]")),
    email: Joi.string()
      .min(4)
      .max(50)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fi"] } })
      .required(),
    password: Joi.string().min(8).max(60).required(),
  });

  const { error } = UserSchema.validate({ name, email, password });

  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message);
    return;
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).send("Could not create user, try again please");
  }

  const newUser = {
    id: v4(),
    name,
    email,
    job_role: jobRole,
    password: hashedPassword,
  };

  try {
    const exist = await users.findByEmail(newUser.email);
    if (exist.length > 0) {
      return res.status(422).send("Could not create user, user exists");
    }

    const result = await users.create(newUser);
    if (!result) {
      return res.status(500).send("Could not create user, try again please");
    }

    // Get the tracks for the job role
    const tracks = getTracks(jobRole);
    console.log(tracks);
    tracks.forEach(async (track) => {
      await tracksModel.addNewTrackAndTasks(
        newUser.id,
        track.name,
        track.tasks
      );
    });

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Could not create user, try again please");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let identifiedUser;
  try {
    const result = await users.findByEmail(email);
    if (!result[0]) {
      return res.status(401).send("No user found - Check your credentials");
    }
    identifiedUser = result[0];
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
    if (!isValidPassword) {
      return res.status(401).send("No user found - Check your credentials");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }

  try {
    const token = jwt.sign(
      {
        id: identifiedUser.id,
        email: identifiedUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      id: identifiedUser.id,
      email: identifiedUser.email,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
};

const getUserById = async (req, res) => {
  try {
    const { uid } = req.params;
    const response = await users.findById(uid);
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
};

const getTracks = (userJobRole) => {
  // Developer Onboarding Tracks
  const developerTracks = [
    // Track 1: Introduction to Development Environment
    {
      name: "Introduction to Development Environment",
      tasks: [
        {
          name: "Set Up Development Environment",
          description:
            "Install necessary IDEs, version control systems, and required tools.",
          is_done: "0",
        },
        {
          name: "Codebase Familiarization",
          description:
            "Understand the structure and components of the existing codebase.",
          is_done: "0",
        },
        {
          name: "Version Control Basics",
          description:
            "Learn how to use the version control system (e.g., Git) for code collaboration.",
          is_done: "0",
        },
        {
          name: "Code Review Process",
          description:
            "Participate in code reviews to grasp coding standards and collaboration practices.",
          is_done: "0",
        },
      ],
    },
    // Track 2: Programming Fundamentals
    {
      name: "Programming Fundamentals",
      tasks: [
        {
          name: "Programming Languages",
          description:
            "Brush up on or learn the primary programming languages used in the organization.",
          is_done: "0",
        },
        {
          name: "Algorithm and Data Structures",
          description:
            "Gain proficiency in common algorithms and data structures.",
          is_done: "0",
        },
        {
          name: "Testing Basics",
          description:
            "Understand the importance of testing and learn how to write unit tests.",
          is_done: "0",
        },
        {
          name: "Debugging Techniques",
          description:
            "Learn effective debugging strategies to troubleshoot code issues.",
          is_done: "0",
        },
      ],
    },
    // Track 3: Project Collaboration
    {
      name: "Project Collaboration",
      tasks: [
        {
          name: "Agile Methodology",
          description:
            "Understand the agile development process and participate in sprint activities.",
          is_done: "0",
        },
        {
          name: "Collaborative Tools",
          description:
            "Familiarize yourself with collaboration tools like Jira or Trello.",
          is_done: "0",
        },
        {
          name: "Team Communication",
          description:
            "Learn effective communication within the development team.",
          is_done: "0",
        },
        {
          name: "Feature Development",
          description:
            "Contribute to a small feature within a project under supervision.",
          is_done: "0",
        },
      ],
    },
  ];

  // HR Worker Onboarding Tracks
  const hrTracks = [
    // Track 1: Introduction to HR Processes
    {
      name: "Introduction to HR Processes",
      tasks: [
        {
          name: "Organizational Overview",
          description:
            "Understand the company's mission, values, and organizational structure.",
        },
        {
          name: "HR Policies and Procedures",
          description:
            "Familiarize yourself with company HR policies and procedures.",
        },
        {
          name: "HR Systems Training",
          description:
            "Learn to use HR software for tasks such as employee data management.",
        },
        {
          name: "Employee Onboarding",
          description:
            "Shadow experienced HR professionals during the onboarding of new employees.",
        },
      ],
    },
    // Track 2: Employee Relations
    {
      name: "Employee Relations",
      tasks: [
        {
          name: "Conflict Resolution",
          description:
            "Understand and practice conflict resolution techniques.",
        },
        {
          name: "Employee Engagement",
          description:
            "Learn strategies to enhance employee engagement within the organization.",
        },
        {
          name: "Performance Appraisals",
          description:
            "Participate in the performance appraisal process and understand its components.",
        },
        {
          name: "Employee Training and Development",
          description:
            "Explore opportunities for employee training and development.",
        },
      ],
    },
    // Track 3: Legal Compliance
    {
      name: "Legal Compliance",
      tasks: [
        {
          name: "Employment Law Basics",
          description:
            "Gain knowledge of labor laws and regulations applicable to your organization.",
        },
        {
          name: "Diversity and Inclusion",
          description:
            "Understand the importance of diversity and inclusion in the workplace.",
        },
        {
          name: "Workplace Safety",
          description:
            "Learn about workplace safety regulations and practices.",
        },
        {
          name: "HR Compliance Audits",
          description: "Participate in or conduct HR compliance audits.",
        },
      ],
    },
  ];

  // Cashier Onboarding Tracks
  const cashierTracks = [
    // Track 1: Point of Sale (POS) System Training
    {
      name: "Point of Sale (POS) System Training",
      tasks: [
        {
          name: "POS System Navigation",
          description:
            "Learn how to navigate the POS system used by the organization.",
        },
        {
          name: "Transaction Processing",
          description:
            "Understand the steps involved in processing various types of transactions.",
        },
        {
          name: "Cash Handling Procedures",
          description:
            "Master proper cash handling procedures and security measures.",
        },
        {
          name: "Customer Service Basics",
          description:
            "Develop customer service skills for assisting customers during transactions.",
        },
      ],
    },
    // Track 2: Product Knowledge
    {
      name: "Product Knowledge",
      tasks: [
        {
          name: "Product Catalog Familiarization",
          description:
            "Understand the range of products sold by the organization.",
        },
        {
          name: "Promotions and Discounts",
          description: "Learn about ongoing promotions and discount programs.",
        },
        {
          name: "Inventory Management Basics",
          description:
            "Understand the basics of inventory management in the context of cashier responsibilities.",
        },
        {
          name: "Upselling Techniques",
          description:
            "Develop skills in suggesting additional products or services to customers.",
        },
      ],
    },
    // Track 3: Customer Interaction and Conflict Resolution
    {
      name: "Customer Interaction and Conflict Resolution",
      tasks: [
        {
          name: "Effective Communication",
          description:
            "Improve communication skills for positive customer interactions.",
        },
        {
          name: "Handling Customer Complaints",
          description:
            "Learn strategies for handling customer complaints and resolving issues.",
        },
        {
          name: "Team Collaboration",
          description:
            "Understand how cashiers collaborate with other store staff for smooth operations.",
        },
        {
          name: "Emergency Procedures",
          description:
            "Familiarize yourself with emergency procedures and protocols.",
        },
      ],
    },
  ];

  // Example usage
  console.log("Developer Tracks:", developerTracks);
  console.log("HR Tracks:", hrTracks);
  console.log("Cashier Tracks:", cashierTracks);

  let tracks = [];
  switch (userJobRole) {
    case "HR Worker":
      tracks = hrTracks;
      break;
    case "Software Developer":
      tracks = developerTracks;
      break;
    case "Cashier":
      tracks = cashierTracks;
      break;
  }
  return tracks;
};
module.exports = {
  loginUser,
  signUpUser,
  getUserById,
};
