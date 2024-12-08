# rodar `source running.sh` pra rodar o aplicativo no Unix Shell
# fnm é um gerenciador de versões do node

eval "$(fnm env --use-on-cd)"
echo "Node Version: $(node -v)"
echo "Npm Version: $(npm -v)"
npm run dev