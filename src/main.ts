import { createApp } from 'vue';
import App from './App.vue';
// import { Stepper } from 'vant';
import './styles/reset.css';
import './styles/styles.scss';
import 'vant/lib/index.css';

const app = createApp(App);

// app.use(Stepper);
app.mount('#app');
