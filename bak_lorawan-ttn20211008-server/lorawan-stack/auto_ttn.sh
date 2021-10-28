#!/bin/bash

log=/root/lorawan-stack/logs

procnum=`ps -ef|grep "ttn-lw-stack"|grep -v grep|wc -l`

if [ $procnum -eq 0 ]; then
	echo "start run ttn" >> $log
	cd /root/lorawan-stack
	# /root/go/bin/go run ./cmd/ttn-lw-stack/ start >> $log &
	nohup /root/go/bin/go run ./cmd/ttn-lw-stack/ start >> $log 2>&1 & 
fi
