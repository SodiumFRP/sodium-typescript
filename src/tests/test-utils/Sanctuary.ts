import {create, env} from 'sanctuary';


const checkTypes = false; //process.env.BUILD_TYPE !== 'build';
export const S = create({checkTypes, env});