<script>
    let count = 0;
    import { writable } from 'svelte/store';
    import {countStore, name1, greeting} from '../../store';
    import { onDestroy } from 'svelte';
    import {time,elapsed } from '../../timeStore';

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
    // countStore.subscribe((value) => {
	// 	count_value = value;
	// });
    // const unsubscribe = countStore.subscribe(value => {
	// 	count_value = value;
	// });

	// onDestroy(unsubscribe); из-за автоподписки $count Svelte самостоятельно отписывает от хранилища

    const formatter = new Intl.DateTimeFormat(
		'en',
		{
			hour12: true,
			hour: 'numeric',
			minute: '2-digit',
			second: '2-digit'
		}
	);
</script>
<p>Timer</p>
<section>
    <h2>The time is {formatter.format($time)}</h2>
    <p>
        This page has been open for
        {$elapsed}
        {$elapsed === 1 ? 'second' : 'seconds'}
    </p>
</section>

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
        <button on:click={() => countStore.update(n => n + 1)}>
            Increase Store counter
        </button>
        <button on:click={() => countStore.update(n => n - 1)}>
            Decrease Store counter
        </button>
    </div>
    <!-- <p>Store counter: {count_value}</p> -->
    <p>Store counter: {$countStore}</p>
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

<p>label bind number/range</p>
<div>
    <label>
        <input type="number" bind:value={a} min="0" max="10" />
        <input type="range" bind:value={a} min="0" max="10" />
    </label>
    
    
    <label>
        <input type="number" bind:value={b} min="0" max="10" />
        <input type="range" bind:value={b} min="0" max="10" />
    </label>
    <p>{a} + {b} = {a+b}</p>
</div>



<p>Store binding</p>
<div>
    <h2>{$greeting}</h2>
<input bind:value={$name1} />

<button on:click={() => $name1 += '!'}>
	Add exclamation mark!
</button>
</div>

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