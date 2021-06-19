
function exec_cmd {
    $1 || { echo "'$1' failed"; exit 1; }
}  


exec_cmd "git clone https://github.com/gadhagod/Hyrule-Compendium-API test/out/server"
exec_cmd "cd test/out/server"
exec_cmd "python3 -m pip install -r requirements.txt"
exec_cmd "gunicorn server:app --daemon"
exec_cmd "cd ../../.."