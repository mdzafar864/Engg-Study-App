/**
 * data.js — Engg Study content source
 * ------------------------------------------------------------
 * Everything the app shows comes from this one file. To add or
 * change content, edit the arrays below — no other file needs
 * to change.
 *
 * Structure:
 *   BRANCHES  -> list of engineering branches shown in dropdown 1
 *   SEMESTERS -> list of semesters shown in dropdown 2 (1-8)
 *   SUBJECTS  -> subjects per branch + semester, each with a
 *                YouTube PLAYLIST id, shown in dropdown 3
 *
 * How to find a playlist id:
 *   Open the playlist on YouTube, e.g.
 *   https://www.youtube.com/playlist?list=PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT
 *   The id is everything after "list=" -> PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT
 *
 * A subject with playlistId "REPLACE_WITH_PLAYLIST_ID" is a
 * placeholder — swap in a real id to make that subject playable.
 * ------------------------------------------------------------ */

const BRANCHES = [
  { id: "cse", name: "Computer Science & Engineering", short: "CSE" },
  { id: "ece", name: "Electronics & Communication Engineering", short: "ECE" },
  { id: "me", name: "Mechanical Engineering", short: "ME" },
  { id: "ce", name: "Civil Engineering", short: "CE" },
];

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

/**
 * SUBJECTS[branchId][semesterNumber] = [ { name, playlistId }, ... ]
 */
const SUBJECTS = {
  cse: {
    1: [
      { name: "Engineering Mathematics I", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Engineering Physics", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    2: [
      { name: "Engineering Mathematics II", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Basic Electrical & Electronics", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    3: [
      { name: "Data Structures", playlistId: "PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT" },
      { name: "Digital Electronics", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    4: [
      { name: "Design & Analysis of Algorithms", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Computer Organization & Architecture", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    5: [
      { name: "Operating Systems", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Database Management Systems", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    6: [
      { name: "Computer Networks", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Software Engineering", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    7: [
      { name: "Compiler Design", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Artificial Intelligence", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    8: [
      { name: "Cloud Computing", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Cyber Security", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
  },
  ece: {
    1: [
      { name: "Engineering Mathematics I", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Engineering Physics", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    2: [
      { name: "Engineering Mathematics II", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Basic Electrical & Electronics", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    3: [
      { name: "Network Theory", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Electronic Devices & Circuits", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    4: [
      { name: "Digital Electronics", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Signals & Systems", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    5: [
      { name: "Analog Communication", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Microprocessors & Microcontrollers", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    6: [
      { name: "Digital Communication", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Control Systems", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    7: [
      { name: "VLSI Design", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Antenna & Wave Propagation", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    8: [
      { name: "Optical Fiber Communication", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Wireless & Mobile Communication", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
  },
  me: {
    1: [
      { name: "Engineering Mathematics I", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Engineering Physics", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    2: [
      { name: "Engineering Mathematics II", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Engineering Mechanics", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    3: [
      { name: "Strength of Materials", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Thermodynamics", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    4: [
      { name: "Fluid Mechanics", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Theory of Machines", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    5: [
      { name: "Machine Design", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Heat & Mass Transfer", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    6: [
      { name: "Manufacturing Technology", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Dynamics of Machinery", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    7: [
      { name: "Refrigeration & Air Conditioning", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Industrial Engineering", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    8: [
      { name: "Automobile Engineering", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Power Plant Engineering", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
  },
  ce: {
    1: [
      { name: "Engineering Mathematics I", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Engineering Physics", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    2: [
      { name: "Engineering Mathematics II", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Engineering Mechanics", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    3: [
      { name: "Surveying", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Building Materials", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    4: [
      { name: "Strength of Materials", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Fluid Mechanics", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    5: [
      { name: "Structural Analysis", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Geotechnical Engineering", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    6: [
      { name: "Design of Concrete Structures", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Transportation Engineering", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    7: [
      { name: "Design of Steel Structures", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Environmental Engineering", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
    8: [
      { name: "Estimation & Costing", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
      { name: "Construction Management", playlistId: "REPLACE_WITH_PLAYLIST_ID" },
    ],
  },
};
