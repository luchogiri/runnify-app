// @flow

import express from 'express';
import mongoose from 'mongoose';

// import Security from '../helpers/security';
import ModelRoute from './model-route';

import Groups from '../schemas/groups';
import Types from '../schemas/types';
import Stations from '../schemas/stations';
import Palynologists from '../schemas/palynologists';
import Accounts from '../schemas/accounts';

import MeasurementsRoutes from './measurements';
import ConfigRoutes from './config';
import ItemsRoutes from './items';

mongoose.connect('mongodb://localhost/alertapolen');

const router = express.Router();

// router.use( Security );

router.use('/groups', ModelRoute( Groups ));
router.use('/types', ModelRoute( Types ));
router.use('/stations', ModelRoute( Stations ));
router.use('/palynologists', ModelRoute( Palynologists ));
router.use('/accounts', ModelRoute( Accounts ));
router.use('/measurements', MeasurementsRoutes);

router.use('/config', ConfigRoutes);
router.use('/items', ItemsRoutes);

export default router;
