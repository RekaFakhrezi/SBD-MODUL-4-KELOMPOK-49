import { ReportModel } from '../models/reportModel.js';

export const ReportController = {
  async getTopBooks(req, res) {
    try {
      const data = await ReportModel.getTopBooks();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getStats(req, res) {
    try {
      const stats = await ReportModel.getStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};