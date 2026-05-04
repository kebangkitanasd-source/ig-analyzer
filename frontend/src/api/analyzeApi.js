/**
 * api/analyzeApi.js
 * Thin wrapper around POST /analyze.
 * Swap VITE_API_URL in .env for the real Render URL in production.
 */

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";   // "" = same origin (dev proxy)

/**
 * @param {File} followingFile  — following.json
 * @param {File} followersFile  — followers_1.json
 * @returns {Promise<AnalysisResult>}
 */
export async function analyzeFiles(followingFile, followersFile) {
  const form = new FormData();
  form.append("following", followingFile);
  form.append("followers", followersFile);

  const { data } = await axios.post(`${BASE_URL}/analyze`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}

/**
 * @typedef {Object} AnalysisResult
 * @property {{ following_total: number, followers_total: number,
 *              tidak_folbek: number, mutualan: number,
 *              follow_6bln: number, follow_6bln_tidak_folbek: number }} stats
 * @property {UserEntry[]} tidak_folbek
 * @property {UserEntry[]} mutualan
 * @property {UserEntry[]} follow_6bln
 * @property {UserEntry[]} follow_6bln_tidak_folbek
 */

/**
 * @typedef {Object} UserEntry
 * @property {string} username
 * @property {string} date
 * @property {string} url
 */
