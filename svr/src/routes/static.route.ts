import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';
import express from 'express';

class IndexRoute implements Routes {
  public path = '/public';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(`${this.path}`, express.static('public'));
  }
}

export default IndexRoute;
