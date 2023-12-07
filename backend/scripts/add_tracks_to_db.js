const pool = require("../db/pool");

// Sample data for tracks and tasks
const trackData = [
    { name: 'HR Worker Onboarding' },
    { name: 'Software Developer Training' },
    { name: 'Cashier Onboarding' }
  ];
  
  const hrTasks = [
    { name: 'Complete HR Paperwork', description: 'Fill out all required HR paperwork for onboarding, including tax forms, emergency contact information, and other essential documents.' },
    { name: 'Company Policies Overview', description: 'Review and understand company policies and procedures, covering topics such as dress code, attendance, and workplace conduct.' },
    { name: 'Employee Benefits Explanation', description: 'Provide a detailed explanation of employee benefits, including health insurance options, retirement plans, and other perks.' },
    { name: 'Conflict Resolution Training', description: 'Participate in training sessions focused on resolving workplace conflicts, promoting a healthy work environment.' },
    { name: 'Performance Review Process', description: 'Learn about the companys performance review process, including goal-setting, feedback, and professional development opportunities.' }
  ];
  
  const softwareDeveloperTasks = [
    { name: 'Version Control Training', description: 'Attend training sessions on version control systems, with a focus on using Git for collaborative software development.' },
    { name: 'Code Review Best Practices', description: 'Understand and follow best practices for code reviews, including constructive feedback and collaboration with team members.' },
    { name: 'Software Testing Techniques', description: 'Receive training on various software testing techniques and methodologies, ensuring high-quality software products.' },
    { name: 'Agile Development Overview', description: 'Introduction to Agile development methodologies, including Scrum and Kanban, emphasizing iterative and collaborative development.' },
    { name: 'Programming Language Proficiency', description: 'Enhance proficiency in programming languages used in the company, with a focus on practical application and problem-solving.' }
  ];
  
  const cashierTasks = [
    { name: 'Cash Register Training', description: 'Hands-on training to operate the cash register efficiently, including processing transactions, handling cash, and providing accurate change.' },
    { name: 'Customer Service Skills', description: 'Enhance customer service skills for assisting shoppers, including effective communication, problem-solving, and creating a positive shopping experience.' },
    { name: 'Inventory Management Basics', description: 'Training on basic inventory management principles, covering tasks such as restocking shelves, tracking product availability, and maintaining organized displays.' },
    { name: 'Refund and Exchange Procedures', description: 'Understand and follow procedures for processing refunds and exchanges, ensuring a smooth customer experience in compliance with company policies.' },
    { name: 'Point of Sale (POS) System Training', description: 'Comprehensive training on using the Point of Sale (POS) system, covering features such as product scanning, discounts, and handling multiple payment methods.' }
  ];
  
  
  // Arrays to store track and task SQL queries
  const trackQueries = [];
  const taskQueries = [];
  
// Generate SQL queries for tracks
trackData.forEach((track, index) => {
    const trackId = index + 1;
    const trackQuery = `INSERT INTO \`OnboardingToolDB\`.\`tracks\` (\`id\`, \`name\`) VALUES (${trackId}, '${track.name}');`;
    trackQueries.push(trackQuery);
  
    // Generate SQL queries for tasks specific to each track
    let tasks;
    switch (track.name) {
      case 'HR Worker Onboarding':
        tasks = hrTasks;
        break;
      case 'Software Developer Training':
        tasks = softwareDeveloperTasks;
        break;
      case 'Cashier Onboarding':
        tasks = cashierTasks;
        break;
      default:
        tasks = [];
    }
  
    tasks.forEach((task, taskIndex) => {
      const taskId = trackId * 10 + taskIndex + 1;
      const taskQuery = `INSERT INTO \`OnboardingToolDB\`.\`tasks\` (\`id\`, \`name\`, \`description\`, \`is_done\`, \`tracks_id\`) VALUES (${taskId}, '${task.name}', '${task.description}', 0, ${trackId});`;
      taskQueries.push(taskQuery);
    });
  });
  
// Function to execute queries
async function executeQueries() {
    try {
      // Execute track queries
      for (const query of trackQueries) {
        await pool.promise().query(query);
      }
  
      // Execute task queries
      for (const query of taskQueries) {
        await pool.promise().query(query);
      }
  
      console.log('Database populated successfully!');
    } catch (error) {
      console.error('Error executing queries:', error);
  
      // If you want to see the specific MySQL error, you can access it like this:
      if (error && error.sqlMessage) {
        console.error('MySQL Error:', error.sqlMessage);
      }
    } finally {
      pool.end(); // Close the pool after executing queries
    }
  }
  
  // Call the function to execute queries
  executeQueries();