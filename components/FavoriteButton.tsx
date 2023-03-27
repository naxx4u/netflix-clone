import React, {useMemo, useCallback} from 'react'
import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorite from '@/hooks/useFavorites'
import axios from 'axios'

import {AiOutlinePlus, AiOutlineCheck} from 'react-icons/ai'

interface FavoriteButtonProps {
movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({movieId}) => {

    const {mutate: mutateFavorites } = useFavorite()
    const {data: currentUser, mutate} = useCurrentUser()

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(movieId)
    }, [currentUser, movieId])

    const toggleFavorites = useCallback(async () => {
        let response

        if (isFavorite) {
            response = await axios.delete('/api/favorite/',{ data: {movieId}})
        } else {
            await axios.post('/api/favorite/', {movieId})
        }

        const updatedFavoritesIds = response?.data?.favoritesIds

        mutate({...currentUser, favoriteIds: updatedFavoritesIds})

        mutateFavorites()

    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

    const Icon = isFavorite ? AiOutlineCheck :  AiOutlinePlus

  return (
    <div onClick={toggleFavorites}
     className='
    cursor-pointer
    group/item
    h-6 w-6
    lg:h-10 lg:w-10
    border-2
    border-white
    rounded-full
    flex
    justify-center
    items-center
    transition
    hover:border-neutral-300
    '>
        <Icon className='text-white' size={25} />
    </div>
  )
}

export default FavoriteButton