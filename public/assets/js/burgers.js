document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }

    const devourButtons = document.querySelectorAll(".devour-button");
    if(devourButtons) {
        devourButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('id');
                const newDevouredState = {
                    devoured: true
                }
                fetch(`/api/burgers/${id}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newDevouredState)
                }).then((response) => {
                    if(response.ok) {
                        console.log(`Changed devoured to: ${newDevouredState}`);
                        location.reload('/');
                    } else {
                        console.log('Error: unable to change devoured state');
                    }
                })
            });
        });
    }
});