LC_ALL=C

# Define o diretório local chamado "temp"
temp_dir="./temp"

# Cria a pasta "temp" caso não exista
mkdir -p "$temp_dir"

readmsg() {
    # return non-zero if fewer than 4 bytes of input available
    # or if message is shorter than length specified by first 
    # 4 bytes of input
    # otherwise, set the variable $msg and return 0

    local -i i n len=0
    local REPLY
    for ((i=0; i<4; i++)); do
        read -r -d '' -n 1 || return
        printf -v n %d "'$REPLY"
        len+='n<<i*8'
    done
    read -r -N "$len" && ((${#REPLY}==len)) && msg=$REPLY
}

sendmsg() {
    local x
    # the message length as 4 hex bytes
    printf -v x %08X "${#1}"
    # write each of the 4 bytes
    printf %b "\x${x:6:2}\x${x:4:2}\x${x:2:2}\x${x:0:2}"
    # write the message itself
    printf %s "$1"
}

while readmsg; do
    #chamar AI Impact
    event_type=`echo $msg | cut -d$ -f2 | cut -d# -f1`
    event_id=`echo $msg | cut -d$ -f2 | cut -d# -f2`
    echo $msg >> ./temp/log.txt
    echo "event_type: "$event_type >> ./temp/log.txt
    echo "event_id: "$event_id >> ./temp/log.txt
    response='{"echo": "foo"}'
    sleep 5s
    sendmsg "$response"
    break
done
