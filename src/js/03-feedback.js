import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';

const refs = {
    feedbackFormRef: document.querySelector('.feedback-form'),
    feedbackFormEmailRef: document.querySelector('.feedback-form [name="email"]'),
    feedbackFormMessageRef: document.querySelector('.feedback-form [name="message"]'),
}

examinationLocalStorageData();

refs.feedbackFormRef.addEventListener('input', throttle(onFeedbackFormRefInput, 500));
refs.feedbackFormRef.addEventListener('submit', onfeedbackFormRefSubmit);

function onFeedbackFormRefInput(){
        const data = { 
            email: refs.feedbackFormRef.elements.input, 
            message: refs.feedbackFormMessageRef.value
        };
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}
function onfeedbackFormRefSubmit(event){
    event.preventDefault();

    console.log('email:', refs.feedbackFormEmailRef.value);
    console.log('message:', refs.feedbackFormMessageRef.value);

    localStorage.removeItem(LOCALSTORAGE_KEY);
    event.target.reset();
}
function examinationLocalStorageData(){
    const local = localStorage.getItem(LOCALSTORAGE_KEY);
    if(!local){
        return;
    }
    try{
        const {email, message} = JSON.parse(local);
        refs.feedbackFormEmailRef.value = email;
        refs.feedbackFormMessageRef.value = message;
    }
    catch(error){
        console.log('name error:', error.name);
        console.log('message error:', error.message);
    }
}