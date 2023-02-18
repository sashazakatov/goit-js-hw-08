import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = "feedback-form-state";

const feedbackFormRef = document.querySelector('.feedback-form');
const feedbackFormEmailRef = document.querySelector('.feedback-form [name="email"]');
const feedbackFormMessageRef = document.querySelector('.feedback-form [name="message"]');

examinationLocalStorageData();

feedbackFormRef.addEventListener('input', throttle(onFeedbackFormRefInput, 500));
feedbackFormRef.addEventListener('submit', onfeedbackFormRefSubmit);

function onFeedbackFormRefInput(){
        const data = { 
            email: feedbackFormEmailRef.value, 
            message: feedbackFormMessageRef.value
        };
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}
function onfeedbackFormRefSubmit(event){
    event.preventDefault();
    console.log("email:", feedbackFormEmailRef.value);
    console.log("message:", feedbackFormMessageRef.value);
    localStorage.removeItem(LOCALSTORAGE_KEY);
    event.target.reset();
}
function examinationLocalStorageData(){
    const local = localStorage.getItem(LOCALSTORAGE_KEY);
    if(!local){
        return;
    }
    try{
        const data = JSON.parse(local);
        const {email, message} = data;
        feedbackFormEmailRef.value = email;
        feedbackFormMessageRef.value = message;
    }
    catch(error){
        console.log("name error:", error.name);
        console.log("message error:", error.message);
    }
}