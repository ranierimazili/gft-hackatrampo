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
    #Extract variable values from message
    event_type=`echo $msg | cut -d$ -f2 | cut -d# -f1`
    event_id=`echo $msg | cut -d$ -f2 | cut -d# -f2`
    platform=`echo $msg | cut -d$ -f2 | cut -d# -f3`

    #Start logging
    echo "Start: "`date` >> ./temp/log.txt
    echo "full_message: "$msg >> ./temp/log.txt
    echo "event_type: "$event_type >> ./temp/log.txt
    echo "event_id: "$event_id >> ./temp/log.txt
    echo "platform: "$platform >> ./temp/log.txt
    echo "processing..." >> ./temp/log.txt

    case "$event_type" in
        codereview)
            gft ${event_type} --config_path /app/config_${platform}.yml --pullnumber ${event_id} > /dev/null 2>&1
            ;;
        storycreator)
            gft ${event_type} --config_path /app/config_${platform}.yml --parent-id ${event_id} > /dev/null 2>&1
            ;;
        storytaskcreator)
            gft ${event_type} --config_path /app/config_${platform}.yml --story-id ${event_id} > /dev/null 2>&1
            ;;
        *)
            echo "Unknown event_type: "${event_type} >> ./temp/log.txt
            ;;
    esac
    
    echo "End: "`date` >> ./temp/log.txt
    echo "-----------------------------" >> ./temp/log.txt
    
    #Send the response back to the plugin to notify the end of the processing
    response='{"echo": "foo"}'
    sendmsg "$response"
    
    #Wait some seconds to let the message arrive on plugin before close the connection
    sleep 3s
    break
done
