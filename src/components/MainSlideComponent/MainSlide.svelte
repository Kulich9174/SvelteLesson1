<script>
    let count = 0;
    import { writable } from 'svelte/store';
    import {countStore} from '../../store';

    let name = '';
    let surname = '';
    let age = '';
    let cards = writable([]);

    let a = 1;
	let b = 2;

    function saveCard() {
        // Добавляем новую карточку в массив cards
        cards.update(currentCards => {
            return [...currentCards, { name, surname, age }];
        });
        
        // Очистка полей формы после сохранения
        name = '';
        surname = '';
        age = '';
    }
    let count_value;
    countStore.subscribe((value) => {
		count_value = value;
	});
</script>

<div class="bodyContainer">
    <div class="buttonsContainer">
        <button on:click={()=>{count+=1}}>
            Increase counter
        </button>
       
        
        <button on:click|once={()=>{count-=1}}>
            Decrease counter
        </button>
        
    </div>

    <p>Counter: {count}</p>
    <div>
        <button on:click={count_value.update((n)=> n + 1)}>
            Increase Store counter
        </button>
        <button on:click|once={count_value.update((n)=> n - 1)}>
            Decrease store counter
        </button>
    </div>
    <p>Store counter: {count_value}</p>
    {#if (count > 10)}
        <p>Значение слишком большое</p>
    {:else if ( count < 5)}
        <p>Значение слишком маленькое</p>
    {:else}
        <p>Оптимальное значение</p>
    {/if}
</div>
<div class="formContainer">
    <h2>Заполните информацию о себе</h2>
    <input type="text" placeholder="Name" bind:value={name}>
    <input type="text" placeholder="Surname" bind:value={surname}>
    <input type="text" placeholder="Age" bind:value={age}>
    <button on:click={saveCard}>
        Save
    </button>
    <div class="cardContainer">
        {#each $cards as card, index}
            <div class="card">
                <h1>Card {index + 1}</h1>
                <p>Name : {card.name}</p>
                <p>Surname : {card.surname}</p>
                <p>Age : {card.age}</p>
            </div>
        {/each}
    </div>
</div>
<label>
	<input type="number" bind:value={a} min="0" max="10" />
	<input type="range" bind:value={a} min="0" max="10" />
</label>

<label>
	<input type="number" bind:value={b} min="0" max="10" />
	<input type="range" bind:value={b} min="0" max="10" />
</label>
<p>{a} + {b} = {a+b}</p>
    

<style>
    .buttonsContainer{
        display: flex;
        gap:20px;
    }
    .bodyContainer{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .formContainer{
        display: block;
        
    }
    .cardContainer{
        display: flex;
        align-items: start;
        gap:20px;
    }
    .card{
        border: 1px solid black;
        padding:10px;
    }
</style>