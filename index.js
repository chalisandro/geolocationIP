const fetchIpInfo = async (ip) => {
    try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener información de la IP');
        }
        return await response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
};

const $form = document.querySelector('#form');
const $input = document.querySelector('#ip');
const $submit = document.querySelector('#submit');
const $resultado = document.querySelector('#resultado');

$form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { value } = $input;

    if (!value) {
        $resultado.innerHTML = 'Por favor, introduce una dirección IP válida.';
        return;
    }

    $submit.setAttribute('disabled', '');
    $submit.setAttribute('aria-busy', 'true');

    const ipInfo = await fetchIpInfo(value);

    if (ipInfo) {
        console.log(ipInfo);
        if (ipInfo.status === 'fail') {
            $resultado.innerHTML = 'No se pudo obtener información de la IP. Verifica que la IP sea válida.';
        } else {
            $resultado.innerHTML = JSON.stringify(ipInfo, null, 2);
        }
    } else {
        $resultado.innerHTML = 'No se pudo obtener información de la IP. Verifica que la IP sea válida.';
    }

    $submit.removeAttribute('disabled');
    $submit.removeAttribute('aria-busy');
});
