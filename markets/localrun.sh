#!/bin/localrun.sh


while [ -n "$1" ]
# while loop starts
	do
		case "$1" in
		 
		# Message for -p option
		 

		-p) echo " " 
			echo "============ Pulling new OHLCV data ============"
			echo " "
			cd ~/dev/data/explore
			bash ~/dev/data/explore/run.sh
			cd ~/dev/dashboards/markets
			echo " " 
			echo "============ OHLCV data refreshed ============"
			echo " "
			;;
		 
		# In case you typed a different option other than a,b,c
		 
		*) echo "Option $1 not recognized" ;;
		 
		esac
	shift
done

cp ~/dev/data/explore/out/* ./out
Rscript app.R
echo "============ DONE ============"
